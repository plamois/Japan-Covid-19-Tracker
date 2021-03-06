import React from 'react';

const totalKeyArray = ['cases','discharge','deaths'];

function DetailsView(props) {
    const {
        location: {name_en, name_ja},
        onClickClose
    } = props;

    const title = name_en + ' (' + name_ja + ')';

    const totalElements = totalKeyArray.map(key => {
        const count = props.location[key];
        return (
            <div key={key} className="columns">
                <div className="column">
                    <h6 className="title is-6">{key}</h6>
                </div>
                <div className="column">
                    <p className="is-6 has-text-right">{count}</p>
                </div>
            </div>
        );
    });

    return (
        <div className="details-view">
            <div className="details-view-close" onClick={onClickClose}>&times;</div>
            <div className="details-view-content">
                <h4 className="title is-4">{title}</h4>
                {totalElements}
            </div>
        </div>
    );
}

export default DetailsView;