import { Stack } from 'expo-router';
import '../msw.polyfills';
import { server } from '../mocks/server';
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';

server.listen();

export default function RootLayout() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Stack>
					<Stack.Screen name="My Ferry Trips" />
				</Stack>
			</PersistGate>
		</Provider>
	);
}
