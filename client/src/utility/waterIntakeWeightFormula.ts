import React from 'react';

export default async function waterIntakeWeightFormula (weight:number|undefined|null) {
        if (weight) {
            let waterIntake:number = weight * (2 / 3);
            return waterIntake;
        } else {
            return 1000
        }
}