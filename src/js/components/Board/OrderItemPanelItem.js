import React, { Component } from 'react';
import {
  CustomInput
} from 'reactstrap';
import moment from 'moment';
import classnames from 'classnames';

import BoardDueAt from './BoardDueAt';
import AvatarGroup from '../Avatars/AvatarGroup';
import { TASK_STATUS } from '../../configs/enums';

class OrderItemPanelItem extends Component {
  render() {
    const {
      data, onCompleteChange, onClick, className
    } = this.props;

    const date = moment(moment(data.due_at).format('YYYY-MM-DD'), 'YYYY-MM-DD');
    const today = moment(moment(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD');
    const diffInDays = date.diff(today, 'days');
    const classNameMap = {
      'board-task-item': true,
      'bg-ivory': data.status !== TASK_STATUS.COMPLETED && diffInDays === 0,
      'bg-honeydew': data.status === TASK_STATUS.COMPLETED
    };

    if (className) {
      classNameMap[className] = true;
    }

    return (
      <div
        className={classnames(classNameMap)}
      >
        <div className="board-task-item-left">
          <div>
            <CustomInput
              type="checkbox"
              id={`task_${data.id}`}
              label={data.title}
              onChange={(event) => { event.stopPropagation(); onCompleteChange(data); }}
              checked={data.status === TASK_STATUS.COMPLETED} />
          </div>
          <div>
            {data.due_at && <BoardDueAt date={data.due_at} />}
          </div>
        </div>
        <div
          style={{ flex: 1 }}
          onClick={() => { onClick(data); }}
          role="presentation"
        />
        <div
          className="board-task-item-right"
          onClick={() => { onClick(data); }}
          role="presentation"
        >
          <div>
            {
              (data.status === TASK_STATUS.COMPLETED && <b className="text-success">Completed!</b>)
              || (data.status === TASK_STATUS.PENDING_VERIFICATION && <b className="text-warning">In review!</b>)
              || (data.status === TASK_STATUS.IN_PROGRESS && <b className="text-secondary">In Progress!</b>)
              || (data.status === TASK_STATUS.TODO && <b className="text-primary">To do!</b>)
              || (data.status === TASK_STATUS.VERIFIED && <b className="text-dark">Verified!</b>)
            }
          </div>
          <div>
            {data.status_changed_at && <span>{moment(data.status_changed_at).format('D MMM')}</span>}
          </div>
          <div>
            <AvatarGroup users={data.assignees} verifiers={data.verifiers} />
          </div>
        </div>
      </div>
    );
  }
}

OrderItemPanelItem.defaultProps = {
  data: {},
  onClick: () => {},
  onCompleteChange: () => {}
};

export default OrderItemPanelItem;
