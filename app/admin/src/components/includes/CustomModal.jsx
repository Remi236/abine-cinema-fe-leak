import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Modal } from 'reactstrap';
import classNames from 'classnames';

import {ThemeContext} from '../../contexts/theme.Context';

const CustomModal = ({title, message, color, colored, header, isOpen, onClose, type, onConfirm, buttonDelContent, buttonCancelContent}) => {

  const {isLightTheme} = useContext(ThemeContext);

  const modalClass = classNames({
    'modal-dialog--colored': colored,
    'modal-dialog--header': header,
    'theme-light' : isLightTheme,
    'theme-dark' : !isLightTheme,
  });

  const getIcon = () => {
    let Icon;
    switch (color) {
      case 'primary':
        Icon = <span className="lnr lnr-pushpin modal__title-icon" />;
        break;
      case 'success':
        Icon = <span className="lnr lnr-thumbs-up modal__title-icon" />;
        break;
      case 'warning':
        Icon = <span className="lnr lnr-flag modal__title-icon" />;
        break;
      case 'danger':
        Icon = <span className="lnr lnr-cross-circle modal__title-icon" />;
        break;
      default:
        break;
    }
    return Icon;
  }

  return (
    <div>
      {/* <Button color={color} onClick={() => toggle()}>{buttonContent}</Button> */}
      <Modal
        isOpen={isOpen}
        modalClassName='ltr-support '
        className={`modal-dialog--${color} ${modalClass} rounded-3`}
        
      >
        <div className="modal__header">
          <h4 className="text-modal modal__title text-white">{title}</h4>
          {header ? '' : getIcon()}
          <button className="lnr lnr-cross modal__close-btn" type="button" onClick={() => onClose(type)} />
        </div>
        <div className="modal__body modal-body pb-3">
          {message}
        </div>
        <div className="modal__footer mb-0"></div>
        { type === "delete" && ( <ButtonToolbar className="modal__footer">
            <Button className="modal_ok" outline={colored} color={color} onClick={(e) => onConfirm(e)}>{buttonDelContent}</Button>
            <Button className="modal_cancel" onClick={() => onClose(type)}>{buttonCancelContent}</Button>
          </ButtonToolbar>)}
      </Modal>
    </div>
  );
}

CustomModal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.any,
  color: PropTypes.string.isRequired,
  colored: PropTypes.bool,
  header: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  type: PropTypes.string,
  buttonDelContent: PropTypes.element,
  buttonCancelContent: PropTypes.element,
};

CustomModal.defaultProps = {
  title: '',
  // message: ,
  colored: false,
  header: false,
  onClickSubmit: null,
};

export default CustomModal;
