import _ from 'lodash';

import days from './../constants/days';
import hours from './../constants/hours';
import equipment from './../constants/equipment';

export default (payload) => {
    if ((payload[0] || {}).schedule) {
        return payload.map(({key, schedule}) => ({key, schedule: escape(schedule)}));
    } else {
        return escape(payload);
    }

    function escape(arr) {
        return arr.map((doc) => {
            const clonedDoc = _.cloneDeep(doc);
            if (!_.isNil(clonedDoc.day)) {
                clonedDoc.day = days[clonedDoc.day];
            }

            if (!_.isNil(clonedDoc.hour)) {
                clonedDoc.hour = hours[clonedDoc.hour];
            }

            if (clonedDoc.weeks && _.isArray(clonedDoc.weeks)) {
                clonedDoc.weeks = clonedDoc.weeks.join(',');
            }

            if (clonedDoc.equipment) {
                clonedDoc.equipment = clonedDoc.equipment.map((id) => equipment[id]).join('; ');
            }

            return clonedDoc;
        });
    }
};