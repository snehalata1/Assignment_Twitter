/* eslint-disable */
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import theme from "../../theme";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faCaretRight, faCaretDown);
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    wrapper: {
       display: 'flex'
    },
    m_20: {
       margin: 20,
    },
     m_l_20: {
       marginLeft: 20,
    },
    btn_style: {
      margin: 20, 
      border: '1px solid #d3d3d3'
    },
    textBox: {
      height: 30,
    }
}));

export const Dashboard = (props) => {
    const [productName, setProductName] = useState(null);
    const [showInputBox, setShowInputBox] = useState(false);
    const [productList, setProductList] = useState([]);
    const [cartList, setCartList] = useState([]);
    const classes = useStyles();

    const handleAddToCartClick = (name) => {
        setCartList(cartList.concat(name));
    }

    const handleItemName = (e) => { 
        if (e.key === "Enter") {  
            let productName = document.getElementById('productID').value;
            setProductList(productList.concat(productName));
            setShowInputBox(false);
        }
    }

    const handleDeleteItemClick = (valueToRemove, index) => {
        let list = productList;
        let cList = cartList;
        const filteredProductList = list.filter(item => item !== valueToRemove);
        setProductList(filteredProductList);

        // if you want to delete from cart list as well
        // if (cList !== null) {
        //     const filteredCartList = cList.filter(item => item !== valueToRemove);
        //     setCartList(filteredCartList);
        // }
    }

    const handleAddNewItemClick = () => {
        setShowInputBox(true);
    }

    const handleRemoveFromCartClick = (index) => {
        let list = cartList;
        const filteredCartList = list.slice(0, index).concat(list.slice(index + 1, list.length));
        setCartList(filteredCartList);
    }

    return (
        <Grid md={12} xs={12} >
            <div md={12} xs={12} className={classes.wrapper}>
                <div md={8} xs={8} className={classes.m_20} >
                    <h2 className={classes.m_20}>Items</h2>
                    {productList !== null && productList !== undefined && productList.length !== 0 ?
                        <div>
                            {productList.map((item, i) => (
                                <div className={classes.m_l_20}>
                                    {/* <div id={i} >{item}</div>     style={{ whiteSpace: 'nowrap', width: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} */}
                                    <span id={i}>{item}</span>
                                    <Button onClick={() => handleAddToCartClick(item)} className={classes.btn_style}>Add To cart</Button>
                                    <Button onClick={() => handleDeleteItemClick(item, i)} className={classes.btn_style}>Delete Item</Button>
                                </div>
                            ))}
                        </div>
                        :
                        ''
                    }

                    <div>
                        <Button onClick={() => handleAddNewItemClick()} className={classes.btn_style} >Add New Item</Button>
                        {showInputBox ? <input type="text" id="productID" value={productName} className={classes.textBox} onKeyPress={(e) => handleItemName(e)} /> : ''}
                    </div>

                </div>

                <div md={4} xs={4} className={classes.m_20}>
                    <h2 className={classes.m_20}>Cart</h2>
                   
                    {cartList !== null && cartList !== undefined && cartList.length !== 0 ?
                        <div>
                            {cartList.map((item, j) => (
                                <div className={classes.m_l_20}>
                                    <span id={j}>{item}</span>
                                    <Button onClick={() => handleRemoveFromCartClick(j)} className={classes.btn_style}>Remove from cart</Button>
                                </div>
                            ))}
                        </div>
                        :
                        ''
                    }
                </div>
            </div>
        </Grid >
    );
}

const mapStateToProps = (state) => ({
    user: state.user && state.user.data,
    twitter: state.twitter,
});

const mapDispatchToProps = (dispatch) => {
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);