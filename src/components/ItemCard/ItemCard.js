import React, { Component } from 'react';
import './ItemCard.css';

import { Edit, Wrong } from '../../components/SvgIcons/SvgIcons';

export default class ItemCard extends Component {

    openModal(index, list) {
        this.props.openModal(index, list);
    }

    deleteItem(index, list) {
        this.props.deleteItem(index, list);
    }

    drag = (e) => {
        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.setData('data-id', e.target.attributes['data-id'].nodeValue);
        e.dataTransfer.setData('data', e.target.attributes['data'].nodeValue);
    }

    render() {
        const { data, theme, index, id, dataId } = this.props;
        return(
            <div className={`itemCard Theme-${theme}`} id={id}
            data-id={dataId} draggable="true" onDragStart={this.drag}
            data={JSON.stringify(data)}
            >
                <div className="item-label">Title: {data.title}</div>
                <div className="item-label" style={{lineHeight: '2rem'}}>Desc: {data.desc}</div>
                <div className="item-label">Priority: {data.priority}</div>
                <div className="edit-icon-wrapper">
                    <div onClick={this.openModal.bind(this, index, data.list)}><Edit theme="transparent" /></div>
                    <div onClick={this.deleteItem.bind(this, index, data.list)}><Wrong theme="transparent" /></div>
                </div>
            </div>
        )
    }
}