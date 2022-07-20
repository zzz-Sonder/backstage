import CategorySelect from '@/components/CategorySelect'
import HintButton from '@/components/HintButton'


export default {
    install(Vue, options) {
        Vue.component('CategorySelect', CategorySelect)
        Vue.component('HintButton', HintButton)
    }
}