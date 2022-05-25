import { Student } from './student'
import { Teacher } from "./teacher"

export const STUDENTS: Student[] = [
    { id: 1, name: 'Zezinho', age: 19, course: 'Análise e Desenvolvimento de Sistemas', semester: 3 },
    { id: 2, name: 'Luisinho', age: 18, course: 'Gestão de Tecnologia da Informação', semester: 1 },
    { id: 3, name: 'Miguelito', age: 19, course: 'Mecatrônica', semester: 6 },
    { id: 4, name: 'Joselito', age: 19, course: 'Gestão Empresarial', semester: 2 },
    { id: 5, name: 'Pedrinho', age: 19, course: 'Análise e Desenvolvimento de Sistemas', semester: 2 },
    { id: 6, name: 'Joãosinho', age: 19, course: 'Análise e Desenvolvimento de Sistemas', semester: 3 }
]

export const TEACHERS: Teacher[] = [

    { id: 1, name: 'Chico', class: 'Estatística'},
    { id: 2, name: 'Glauco', class: 'Eletiva Web'},
    { id: 3, name: 'Margarida', class: 'Programação Linear'},
    { id: 4, name: 'Tadeu', class: 'Estruturas de Dados'},
    { id: 5, name: 'Ricardo', class: 'Interação Humano-Computador'},

]