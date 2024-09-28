import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from './bookingsSlice';
import { View, Text, ActivityIndicator } from 'react-native';

export default function CustomerDetailsScreen() {
	const dispatch = useDispatch();
	const { futureBookings, historicBookings, loading, error } = useSelector(
		(state) => state.bookings
	);
	const { surname, bookingReference } = useLocalSearchParams();

	useEffect(() => {
		dispatch(fetchBookings({ surname, bookingReference }));
	}, [dispatch, surname, bookingReference]);

	if (loading) {
		return <ActivityIndicator size="large" color="#0000ff" />;
	}

	if (error) {
		return <Text>Error: {error}</Text>;
	}

	return (
		<View>
			<Text>Future Bookings:</Text>
			{futureBookings.map((booking) => (
				<Text key={booking.id}>{booking.title}</Text>
			))}
			<Text>Historic Bookings:</Text>
			{historicBookings.map((booking) => (
				<Text key={booking.id}>{booking.title}</Text>
			))}
		</View>
	);
}
