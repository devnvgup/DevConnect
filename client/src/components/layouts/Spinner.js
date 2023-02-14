import React from "react";
import spinner from '../../img/Spinner-1s-200px.gif'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <>
        <img
            src={spinner}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt='loading...'
        />
    </>
)