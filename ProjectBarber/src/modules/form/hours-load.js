import dayjs from 'dayjs'
import { openingHours } from '../../utils/opening-hours.js'
import { hoursClick } from './hours-click.js'

const hours = document.getElementById('hours')

export function hoursLoad({ date, dailySchedules }) {
  // Limpa a lista de horários
  hours.innerHTML = ''

  const unavailableHours = dailySchedules.map((schedule) =>
    dayjs(schedule.when).format('HH:mm'),
  )

  const opening = openingHours.map((hour) => {
    const [scheduleHour] = hour.split(':')

    const isHourPast = dayjs(date).add(scheduleHour, 'hour').isBefore(dayjs())

    const available =
      unavailableHours.includes(hour.padStart(5, '0')) && !isHourPast

    return {
      hour,
      available,
    }
  })

  // Renderiza os horários
  opening.forEach(({ hour, available }) => {
    const li = document.createElement('li')
    li.classList.add('hour')
    li.classList.add(!available ? 'hour-available' : 'hour-unavailable')

    li.textContent = hour

    if (hour === '9:00') {
      hourHeaderAdd('Manhã')
    } else if (hour === '13:00') {
      hourHeaderAdd('Tarde')
    } else if (hour === '18:00') {
      hourHeaderAdd('Noite')
    }

    hours.appendChild(li)
  })

  hoursClick()
}

function hourHeaderAdd(title) {
  const header = document.createElement('li')
  header.classList.add('hour-period')
  header.innerHTML = title

  hours.append(header)
}
