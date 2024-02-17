import React from 'react'
import PropTypes from 'prop-types';
// const images = require.context('../../public/', true);

function StaticImageLoader({ loading='lazy', source='rigiLogo', width = '', height = '', className }) {

    return (
        <>
            <picture>
                <source srcSet={require('../../public/webp/rigiLogo.webp')} type="image/webp" />
                <img
                    loading={loading}
                    src={require('../../public/png/rigiLogo.png')}
                    width={width}
                    height={height}
                    alt={`${source}`}
                    className={className}
                />
            </picture>
        </>
    );
}

StaticImageLoader.propTypes = {
    source: PropTypes.string,
    loading: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
};

export default StaticImageLoader;
