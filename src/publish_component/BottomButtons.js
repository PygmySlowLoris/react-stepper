import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BottomButtons extends Component {
    render() {
        // Render if current step index > 0
        let bottomButton = null;
        if (this.props.previous) {
            if (this.props.currentIndex > 0) {
                bottomButton =
                    <div className="stepper-button previous" onClick={this.props.onBackStep}>
                        <i className="material-icons">keyboard_arrow_left</i>
                        <span>Back</span>
                    </div>
            }
        } else {
            bottomButton =
                <div className={['stepper-button next', !this.props.canContinue ? 'deactivated' : ''].join(' ')}
                     onClick={this.props.onNextStep}
                >
                    <span>{(this.props.finalStep) ? 'Finish' : 'Next'}</span>
                    <i className="material-icons">keyboard_arrow_right</i>
                </div>
        }

        return (
            bottomButton
        )
    }
}

BottomButtons.propTypes = {
    previous: PropTypes.bool,
    finalStep: PropTypes.bool,
    currentIndex: PropTypes.number,
    canContinue: PropTypes.bool,
    onBackStep: PropTypes.func,
    onNextStep: PropTypes.func
};

export default BottomButtons;