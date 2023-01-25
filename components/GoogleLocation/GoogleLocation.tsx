import React, { useCallback, useEffect, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import Input from '../Input';
import styles from '../../styles/GoogleLocation.module.scss';
import { GOOGLE_PLACES_API_KEY } from '../../constant/constant';
import clsx from 'clsx';

interface Props {
  onValueSelect: (item: string) => void;
}
export const GoogleLocation = (props: Props) => {
  const { placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: GOOGLE_PLACES_API_KEY,
  });
  const [locationInfo, setLocationInfo] = useState<any>({
    searchText: '',
    suggestedPlaces: [],
    selectedPlace: '',
    showPopup: false,
  });

  useEffect(() => {
    // fetch place details for the first element in placePredictions array
    if (placePredictions.length) {
      setLocationInfo((prevState: any) => ({
        ...prevState,
        suggestedPlaces: placePredictions,
        showPopup: true,
      }));
    }
  }, [placePredictions]);

  const onChangeText = useCallback(
    (event: any) => {
      const value = event.target.value;
      setLocationInfo((prevState: any) => ({
        ...prevState,
        searchText: value,
      }));
      getPlacePredictions({ input: value });
    },
    [getPlacePredictions],
  );

  const onPressPlaces = useCallback(
    (place: string) => {
      setLocationInfo((prevState: any) => ({
        ...prevState,
        selectedPlace: place,
        searchText: place,
        showPopup: false,
      }));
      props.onValueSelect && props.onValueSelect(place);
    },
    [props],
  );

  return (
    <div className={styles.container}>
      <Input
        id="location"
        label="Location"
        placeholder="Location"
        onChange={onChangeText}
        value={locationInfo.searchText}
        className={styles.urlImage}
      />
      <div
        className={clsx(
          styles.placeOverlayContainer,
          locationInfo.suggestedPlaces.length &&
            locationInfo.showPopup &&
            styles.showContainer,
        )}>
        {locationInfo.suggestedPlaces.map((item: any) => (
          <div
            key={item.place_id}
            className={styles.placeTitle}
            onClick={() => {
              onPressPlaces(item.description);
            }}>
            {item?.description}
          </div>
        ))}
      </div>
    </div>
  );
};
