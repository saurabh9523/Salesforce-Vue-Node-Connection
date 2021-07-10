import axios from "axios";

const getBoatTypes = async function() {
	return await axios.get(`/getBoatTypes`, { withCredentials: true });
};

const getAllReviews = async function(boatId) {
	return await axios.get(`/getAllReviews/${boatId}`, { withCredentials: true });
};

const getBoats = async function(boatTypeId) {
	return await axios.get(`/getBoats${boatTypeId ? "/" + boatTypeId : ""}`, {
		withCredentials: true,
	});
};

const getBoatsByLocation = async function(boatTypeId, latitude,longitude) {
	return await axios.get(
		`/getBoatsByLocation/${boatTypeId}?latitude=${latitude}&longitude=${longitude}`,
		{ withCredentials: true }
	);
};

const createRecord = async function(apiName,body) {
	return await axios.post(
		`/createRecord/${apiName}`,
		{...body},
		{ withCredentials: true }
	);
};

const updateRecord = async function(apiName,body) {
	return await axios.post(
		`/updateRecord/${apiName}`,
		{...body},
		{ withCredentials: true }
	);
};

const searchRecord = async function(apiName,searchText) {
	return await axios.get(
		`/searchRecord?apiName=${apiName}&searchText=${searchText}`,
		{ withCredentials: true }
	);
};

export {
	getBoatTypes,
	getAllReviews,
	getBoats,
	getBoatsByLocation,
	createRecord,
	updateRecord,
    searchRecord
};
