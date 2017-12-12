import React, { Component } from 'react';
import './StatusBoxBlock.css';

import ItemCard from '../../components/ItemCard/ItemCard';
import Modal from '../../components/Modal/Modal';
import FadeInOutGroup from "../../components/CSSTransition/FadeInOutGroup";


import { Plus } from '../../components/SvgIcons/SvgIcons';

export default class StatusBoxBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            itemList: props.itemList
        }
    }
    static defaultProps = {
        showAdd: false,
        theme: "transparent"
    };

    openModal = (index, list) => {
        this.setState({
            showModal: true,
            editIndex: index
        })
    }

    closeModal = (e) => {
        this.setState({
            showModal: false,
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            itemList: nextProps.itemList
        })
    }

    render() {
        const { showAdd, theme, list } = this.props;
        const { itemList,
                editIndex,
                showModal,
             } = this.state;
        return(
            <div className={`statusBoxBlock Theme-${theme}`}>
            <FadeInOutGroup>
            {
                itemList[list].map((item, i) => {
                    return (<ItemCard data={item} key={i} index={i}
                    openModal={this.openModal}
                    deleteItem={this.props.deleteItem}
                    id={`drag-${list}-${i}`}
                    dataId={`${list}-${i}`}
                    theme="transparent"
                    />
                )
                })
            }
            </FadeInOutGroup>
            {
                showAdd &&
                    <div className="statusBoxBlock-create-icon-wrapper" onClick={this.props.createItem}>
                        <Plus theme="transparent" size="large"/>
                        <div className="add-text">Add Item</div>
                    </div>
            }
            {
                showModal &&
                <div>
                    <Modal data={itemList} list={list}
                    index={editIndex}
                    closeModal={this.closeModal}
                    showAlert={this.props.showAlert}
                    theme="transparent"
                    />
                </div>
            }
            </div>
        )
    }
}