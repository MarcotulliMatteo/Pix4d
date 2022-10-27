const getDrones = 'SELECT drones.name, drones.brand, drones.serialNumber, drones.cameraModel, cameras.megapixel FROM drones INNER JOIN cameras on drones.cameraModel = cameras.model';
const insertDrone = 'INSERT INTO drones (name, brand, serialNumber, cameraModel) VALUES ($1, $2, $3, $4) RETURNING *';

const SORT_BY = {
    NAME: 'SortBy',
    DELIMITER: ':'
};

const concatFilter = (queryString, column, value, currentIndex) => {
    switch(column.toLowerCase()) {
        case 'name': case 'brand': case 'serialnumber': case 'cameramodel':
            queryString += currentIndex === 0 ? ' WHERE ' : ' AND ';
            queryString += `drones.${column} = '${value}'`;
            break;
        case 'megapixel':
            queryString += currentIndex === 0 ? ' WHERE ' : ' AND ';
            queryString += `cameras.${column} = '${value}'`;
            break;
        default:
            console.error('Filtered Column does not exist no filter will be applied');
            break;
    }

    return queryString;
}

const orderBy = (queryString, orderBy, orderDirection) => {
    const direction = orderDirection.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    switch(orderBy.toLowerCase()) {
        case 'name': case 'brand': case 'serialnumber': case 'cameramodel':
            queryString += ` ORDER BY drones.${orderBy} ${direction}`;
            break;
        case 'megapixel':
            queryString += ` ORDER BY cameras.${orderBy} ${direction}`;
            break;
        default:
            console.error('Column for the Sort By does not exist, no order will be applied');
            break;
    }
    
    return queryString;
}

module.exports = {
    getDrones,
    insertDrone,
    concatFilter,
    orderBy,
    SORT_BY
}