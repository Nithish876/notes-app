import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fb',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 6,
    borderRadius: 12,
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemCard:{
    display:'flex',
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabIcon: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: 'center',
  },
});