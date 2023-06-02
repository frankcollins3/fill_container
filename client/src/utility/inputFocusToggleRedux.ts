import { TOGGLE_INPUT_FOCUS } from '../redux/actions'
export default async function inputFocusToggleRedux(payload:string) { TOGGLE_INPUT_FOCUS( { payload: payload }) }