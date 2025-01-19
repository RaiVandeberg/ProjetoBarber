import dayjs from 'dayjs'
import { scheduleNew } from '../../services/schedule-new.js'
import { schedulesDay } from '../schedules/load.js'

const form = document.querySelector('form')
const clientName = document.getElementById('client')
const selectedDate = document.getElementById('date')

// Data de hoje
const today = dayjs(new Date()).format('YYYY-MM-DD')

// Carrega a data atual
selectedDate.value = today

// Define a data mínima
selectedDate.min = today

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    // Recupera o nome do cliente
    const name = clientName.value.trim()
    if (!name) return alert('Por favor, preencha o nome do cliente')

    // Recupera a hora selecionada
    const hourSelected = document.querySelector('.hour-selected')
    if (!hourSelected) return alert('Por favor, selecione um horário')

    // Recupera somente a hora
    const [hour] = hourSelected.innerText.split(':')

    // Insere a hora na data
    const when = dayjs(selectedDate.value).add(hour, 'hour')

    // Gera um ID
    const id = new Date().getTime().toString()

    await scheduleNew({
      id,
      name,
      when,
    })

    // Recarrega os agendamentos
    await schedulesDay()
    clientName.value = ''
  } catch (error) {
    alert('Não foi possível realizar o agendamento')
  }
}
