import React from 'react';

const totalKeyArray = ['cases', 'discharge', 'deaths'];

function ListView(props) {
	const {
    locationArray,
    selectedLocation,
    onSelectItem,
    onDeselectItem
  } = props;

  function onClickItem(id) {
    if (selectedLocation === null) onSelectItem(id);
    else if (selectedLocation.id !== id) onSelectItem(id);
    else onDeselectItem();
  }

	const totalElements = totalKeyArray.map(key => {
    const sum = locationArray.reduce((sum, location) => {
        return sum + location[key];
    }, 0);
    return (
        <div key={key} className="columns">
            <div className="column">
                <h6 className="title is-6">{key}</h6>
            </div>
            <div className="column">
                <p className="is-6 has-text-right">{sum}</p>
            </div>
        </div>
    );
  });

  const locationElements = locationArray.map(location => {
    const {
        id, name_en, name_ja,
        cases
    } = location;

    var title = name_en + ' (' + name_ja + ')';

    let locationClass = 'list-view-location';
    if (selectedLocation !== null) {
        if (location.id === selectedLocation.id) {
            locationClass += ' selected';
        }
    }

    return (
        <div key={`${id}-${name_en}`} className={locationClass} onClick={() => onClickItem(id)}>
            <div className="columns">
                <div className="column">
                    <h6 className="title is-6">{title}</h6>
                </div>
                <div className="column">
                    <p className="is-6 has-text-right">{cases}</p>
                </div>
            </div>
        </div>
    );
  });

	return (
		<div className="list-view">
			<div className="list-view-brand">
				<h2 className="title is-4">Japan COVID-19 Tracker</h2>
			</div>
			<div className="list-view-total">
				<h2 className="title is-4">Total</h2>
				{totalElements}
			</div>
			<div className="list-view-locations">
        {locationElements}
			</div>
		</div>
	);
}

export default ListView;