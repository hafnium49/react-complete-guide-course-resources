// LEGACY FILE — NOT USED IN THE CUSTOM HOOK STORE APPROACH.
// This file was part of the original Redux setup (lessons 553–554). It defines
// the TOGGLE_FAV action type constant and action creator used by the Redux
// reducer. It is kept for reference but is no longer imported by any component.
// The custom hook store (hooks-store/) replaces this entirely.
export const TOGGLE_FAV = 'TOGGLE_FAV';

export const toggleFav = id => {
    return { type: TOGGLE_FAV, productId: id };
};