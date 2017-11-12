import React, {Component} from 'react'
import PropTypes from 'prop-types'

class TopButtons extends Component {
    render() {
        // Render if current step index > 0
        let topButton = null;
        if (this.props.show) {
            if (this.props.previous) {
                if (this.props.currentIndex > 0) {
                    topButton =
                        <div className={['stepper-button-top', this.props.previous ? 'previous' : 'next'].join(' ')}
                             onClick={this.props.onBackStep}>
                            <i className="material-icons">keyboard_arrow_left</i>
                        </div>
                }
            } else {
                topButton =
                    <div className={['stepper-button-top next', !this.props.canContinue ? 'deactivated' : ''].join(' ')}
                         onClick={this.props.onNextStep}>
                        <i className="material-icons">keyboard_arrow_right</i>
                    </div>
            }
        }

        return (
            topButton
        )
    }
}

TopButtons.propTypes = {
    previous: PropTypes.bool,
    currentIndex: PropTypes.number,
    show: PropTypes.bool,
    canContinue: PropTypes.bool,
    onBackStep: PropTypes.func,
    onNextStep: PropTypes.func
};

export default TopButtons;