const defaultState = () => {
  return {
    email: "fnm@mit.edu",
    name: "Pensive Feynman",
    points: 12,
    pic_url: "https://randomuser.me/api/portraits/men/85.jpg"
  };
}

const state = defaultState();

const mutations = {
  INIT(state, payload_obj) {
    state.email = payload_obj.email;
    state.name = payload_obj.name;
    state.points = payload_obj.points;
    state.pic_url = payload_obj.pic_url;
  },
  DELETE(state) {
    Object.assign(state, defaultState());
  }
}

const actions = {
  setData({ commit }, user_obj) {
    commit('INIT', user_obj);
  },
  clearData({ commit }) {
    commit('DELETE');
  }
}

const getters = {
  usr_email: (state) => {
    return state.email;
  },
  usr_name: (state) => {
    return state.name;
  },
  usr_points: (state) => {
    return state.points;
  },
  usr_img: (state) => {
    return state.pic_url;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}