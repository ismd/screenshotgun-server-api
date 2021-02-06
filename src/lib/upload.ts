import {config} from './config';
import {EDestination} from '../types/EDestination';

function getUpload() {
    switch (config.UPLOAD_DESTINATION) {
        case EDestination.AWS:
            return require('./uploaders/aws').upload;
    }
}

export const upload = getUpload();