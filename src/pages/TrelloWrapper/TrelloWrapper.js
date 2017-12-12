import React, { Component } from 'react';
import StatusBoxBlock from '../../blocks/StatusBoxBlock/StatusBoxBlock';
import './TrelloWrapper.css'

import * as detaTemplate from '../../utils/dataTemplate';
import Alert from "../../components/Alert/Alert";
import { generateAlert } from '../../utils/generateAlert';

export default class TrelloWrapper extends Component {
    constructor(props) {
        super(props);
        let data = JSON.parse(localStorage.getItem('data'));
        if(!data) {
           localStorage.setItem('data', JSON.stringify(detaTemplate.getDataTemplate()));
        }
        this.state = {
            itemList: JSON.parse(localStorage.getItem('data')),
        }
    }

    allowDrop = (ev) => {
        ev.preventDefault();
    }

    drop = (dropArea, ev) => {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text");
        let list = ev.dataTransfer.getData("data-id").split('-')[0];
        let index = ev.dataTransfer.getData("data-id").split('-')[1];
        let droppedItemData = JSON.parse(document.getElementById(data).getAttribute('data'));
        droppedItemData.list = dropArea;
        ev.target.style.border = '';
        if(ev.target.id === data || ev.target.getAttribute('data-id')) { // drop on a card element
            return;
        }
        // else if(ev.target.parentElement.getAttribute('data-id')) {
        //     ev.target.parentElement.parentElement.appendChild(document.getElementById(data));
        //     ev.target.parentElement.parentElement.style.border = '';
        // }
        // else {
        //     ev.target.appendChild(document.getElementById(data));
        // }
        let storedData = JSON.parse(localStorage.getItem('data'));
        storedData[list].splice(index, 1);
        storedData[dropArea].push(droppedItemData);
        localStorage.setItem('data', JSON.stringify(storedData));
        this.setState({
            itemList: storedData,
        })
        this.setState(generateAlert(true, "Issue status updated", "warning"));
        setTimeout(() => {
            this.setState({
                showAlertStatus: false
            })
        }, 2000);
    }

    dragEnter = (event) => {
        event.target.style.border = '5px dotted black';
    }

    dragLeave = (event) => {
        event.target.style.border = '';
    }

    showAlert = (alertMessage, theme) => { // Todo Move it to HOC
        this.setState(generateAlert(true, alertMessage, theme));
        this.setState({
            itemList: JSON.parse(localStorage.getItem('data'))
        })
        setTimeout(() => {
            this.setState({
                showAlertStatus: false
            })
        }, 2000);
    }

    createItem = (e) => {
        let data = JSON.parse(localStorage.getItem('data'));
        data['toDo'].push(detaTemplate.toDoDataTemplate()); // Take it from constant file
        this.setState({
            itemList: data
        })
        localStorage.setItem('data', JSON.stringify(data));
    }

    deleteItem = (index, list) => {
        let data = JSON.parse(localStorage.getItem('data'));
        let newList = this.state.itemList;
        newList = data[list].splice(index, 1);
        this.setState({
            itemList: data
        })
        localStorage.setItem('data', JSON.stringify(data));
    }

    render() {
        const { itemList,
            alertTheme,
            alertText,
            showAlertStatus } = this.state;
        return(
            <div className="Utils-page">
                <div className="list-wrapper">
                {
                    showAlertStatus &&
                        <div className="alert-wrapper">
                            <Alert
                            size="small"
                            theme={alertTheme}
                            look="square"
                            text={alertText}
                            autoClose={true}
                        />
                        </div>
                }

                    <div onDrop={this.drop.bind(this, "toDo")}
                    onDragOver={this.allowDrop} onDragEnter={this.dragEnter}
                    onDragLeave={this.dragLeave} className="list-item">
                    <div className="list-font">TODO</div>
                        <StatusBoxBlock showAdd={true}
                        itemList={itemList} list="toDo"
                        showAlert={this.showAlert}
                        theme="transparent"
                        createItem={this.createItem}
                        deleteItem={this.deleteItem}/>
                    </div>

                    <div onDrop={this.drop.bind(this, "inProgress")}
                    onDragOver={this.allowDrop} onDragEnter={this.dragEnter}
                    onDragLeave={this.dragLeave} className="list-item">
                    <div className="list-font">IN-PROGRESS</div>
                        <StatusBoxBlock showAdd={false}
                        itemList={itemList} list="inProgress"
                        showAlert={this.showAlert}
                        theme="transparent"
                        createItem={this.createItem}
                        deleteItem={this.deleteItem}/>
                    </div>

                    <div onDrop={this.drop.bind(this, "done")}
                    onDragOver={this.allowDrop} onDragEnter={this.dragEnter}
                    onDragLeave={this.dragLeave} className="list-item">
                    <div className="list-font">DONE</div>
                        <StatusBoxBlock showAdd={false}
                        itemList={itemList} list="done"
                        showAlert={this.showAlert}
                        theme="transparent"
                        createItem={this.createItem}
                        deleteItem={this.deleteItem}/>
                    </div>
                </div>
            </div>
        )
    }
}