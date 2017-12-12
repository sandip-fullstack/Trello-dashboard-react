import React, { Component } from 'react';
import './Modal.css';

import Textarea from '../Textarea/Textarea';
import Button from '../Button/Button';

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleValue: props.data[props.list][props.index].title || '',
            descValue:  props.data[props.list][props.index].desc || '',
            priorityValue: props.data[props.list][props.index].priority || '',
        }
    }

    onInput = (value, name) => {
        const mapper = {
            'title': 'titleValue',
            'desc': 'descValue',
            'priority': 'priorityValue'
        }
        const key = mapper[name];
        this.setState({
            [key]: value
        });
    };

    closeModal = (e) => {
        this.props.closeModal();
    }

    onAction = (action, index, data, list) => { // Move it to page component (Smart/Dunmb component structure)
       if (action.toLowerCase() === 'update') {
        data[list][index].title = this.state.titleValue;
        data[list][index].desc = this.state.descValue;
        data[list][index].priority = this.state.priorityValue;
        let storedData = JSON.parse(localStorage.getItem('data'));
        storedData[list] = data[list];
        localStorage.setItem('data', JSON.stringify(storedData));
        this.props.showAlert("Issue Updated", "warning");
       }
       this.props.closeModal();
    }

    render() {
        const { data, index, list } = this.props;
        const { titleValue, descValue, priorityValue } = this.state;

        return(
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={this.closeModal}>&times;</span>
                    <p className="modal-heading">Edit Item</p>
                    Title: <Textarea
                            name="title"
                            type="search"
                            placeholder="Enter Title here"
                            onInput={this.onInput}
                            minLength={1}
                            theme="transparent"
                            size="small"
                            value={titleValue}
                            disabled={false}
                            styles={["bordered"]}
                        />
                    <p>&nbsp;</p>
                    Desc: <Textarea
                            name="desc"
                            type="search"
                            placeholder="Enter Description here"
                            onInput={this.onInput}
                            minLength={1}
                            theme="transparent"
                            size="small"
                            value={descValue}
                            disabled={false}
                            styles={["bordered"]}
                        />
                    <p>&nbsp;</p>

                    Priority:<Textarea
                            name="priority"
                            type="search"
                            placeholder="Enter Priority here(e.g. P0, P1)"
                            onInput={this.onInput}
                            minLength={1}
                            theme="transparent"
                            size="small"
                            value={priorityValue}
                            disabled={false}
                            styles={["bordered"]}
                        />

                <div className="Modal-button-wrapper">
                    <Button
                    theme="primary"
                    size="regular"
                    text="Update"
                    onClick={e => this.onAction('update', index, data, list)}
                    classes="button-gap"
                    />
                     <Button
                    theme="secondary"
                    size="regular"
                    text="Cancel"
                    onClick={e => this.onAction('cancel', index, data, list)}
                    classes="button-gap"
                    />
                </div>
                </div>

            </div>
        )
    }
}