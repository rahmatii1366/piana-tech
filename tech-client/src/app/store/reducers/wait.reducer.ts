import {initialWaitState, WaitState} from "../states/wait.state";
import {WaitActionEnum, WaitActions} from "../actions/wait.action";

export function WaitReducers(state = initialWaitState,
  action: WaitActions
): WaitState {
  switch (action.type) {
    case WaitActionEnum.WAIT_REQUEST: {
      return {
        ...state,
        showSpinner: true
      };
    }
    case WaitActionEnum.WAIT_EXIT: {
      return {
        ...state,
        showSpinner: false
      };
    }
    default:
      return state
  }
}
