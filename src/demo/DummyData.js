import StepOne from './StepOne'
import StepTwo from './StepTwo'

export default [
    {
        icon: 'mail',
        name: 'first',
        title: 'Sample title 1',
        subtitle: 'Subtitle sample',
        completed: false,
        component: StepOne

    },
    {
        icon: 'report_problem',
        name: 'second',
        title: 'Sample title 2',
        subtitle: 'Subtitle sample',
        completed: false,
        component: StepTwo
    }
]