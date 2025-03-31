import { event } from './event/actions';
import { notification } from './notification/actions';
import { resource } from './resource/actions';
import { user } from './user/actions';

export const api = {
    resource,
    notification,
    user,
    event,
};
