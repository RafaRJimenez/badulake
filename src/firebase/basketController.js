import React from 'react';
import { db } from '../firebase/index.js';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export const addBasket = async (basket) => {
    try {
        const docRef = await addDoc(collection(db, 'basket'), basket);
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

export const getBasket = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'basket'));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            console.log("hellooooooooo")
        });
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error('Error getting documents: ', e);
    }
}

export const editBasket = async (id, basket) => {
    try {
        const docRef = doc(db, 'basket', id);
        await updateDoc(docRef, basket);
        console.log('Document updated with ID: ', id);
    } catch (e) {
        console.error('Error updating document: ', e);
    }
}


export const deleteBasket = async (id) => {
    try {
        const docRef = doc(db, 'basket', id);
        await deleteDoc(docRef);
        console.log('Document deleted with ID: ', id);
    } catch (e) {
        console.error('Error deleting document: ', e);
    }
}

