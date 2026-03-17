// "14:30:00" → "2:30 PM"
const formatTime = async (timeStr) => {
    if (!timeStr) return ''
    const [hours, minutes] = timeStr.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const h = hours % 12 || 12
    const m = String(minutes).padStart(2, '0')
    return `${h}:${m} ${period}`
}

const normalizeDate = (dateStr) => {
    if (!dateStr) return ''
    if (dateStr.includes('T')) return dateStr.split('T')[0]
    return dateStr
}

const formatDate = async (dateStr) => {
    const normalized = normalizeDate(dateStr)
    if (!normalized) return ''

    const [year, month, day] = normalized.split('-').map(Number)
    if (!year || !month || !day) return normalized

    return new Date(year, month - 1, day).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

// ("2026-04-05", "10:00:00") → "in 19 days" or "3 days ago"
const formatRemainingTime = async (dateStr, timeStr) => {
    const normalizedDate = normalizeDate(dateStr)
    if (!normalizedDate) return ''

    const eventDate = new Date(`${normalizedDate}T${timeStr || '00:00:00'}`)
    if (Number.isNaN(eventDate.getTime())) return ''

    const now = new Date()
    const diffMs = eventDate - now
    const absDiffMs = Math.abs(diffMs)
    const diffDays = Math.floor(absDiffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(absDiffMs / (1000 * 60 * 60))
    const diffMins = Math.floor(absDiffMs / (1000 * 60))

    const fmt = (n, unit) => `${n} ${unit}${n !== 1 ? 's' : ''}`

    if (diffMs > 0) {
        if (diffDays >= 1) return `in ${fmt(diffDays, 'day')}`
        if (diffHours >= 1) return `in ${fmt(diffHours, 'hour')}`
        return `in ${fmt(diffMins, 'minute')}`
    } else {
        if (diffDays >= 1) return `${fmt(diffDays, 'day')} ago`
        if (diffHours >= 1) return `${fmt(diffHours, 'hour')} ago`
        return `${fmt(diffMins, 'minute')} ago`
    }
}

// Adds a CSS class to the remaining-<id> element when the event has already passed
const formatNegativeTimeRemaining = (remainingStr, eventId) => {
    if (!remainingStr || !eventId) return
    const el = document.getElementById(`remaining-${eventId}`)
    if (el && remainingStr.includes('ago')) {
        el.classList.add('event-past')
    }
}

export default { formatTime, formatDate, formatRemainingTime, formatNegativeTimeRemaining }
