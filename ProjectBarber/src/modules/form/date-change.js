import { schedulesDay } from '../schedules/load'

// Seleciona o input da data
const selectedDate = document.getElementById('date')

// Recarrega a lista de horários ao alterar a data
selectedDate.onchange = () => schedulesDay()
