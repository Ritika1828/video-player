import React from 'react'
import PropTypes from 'prop-types';
// const images = require.context('../../public/', true);

function StaticImageLoader({ loading='lazy', source='rigiLogo', width = '', height = '', className }) {

    return (
        <>
        <div></div>
            <picture>
                <source srcSet={require(`../images/webp/${source}.webp`)} type="image/webp" />
                <img
                    loading={loading}
                    src={require(`../images/png/${source}.png`)}
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
