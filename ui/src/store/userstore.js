const defaultState = () => {
  return {
    email: "fnm@mit.edu",
    name: "Pensive Feynman",
    points: 12,
    pic_url: "https://randomuser.me/api/portraits/men/85.jpg"
  };
}

let state = defaultState();

const mutations = {
  INIT(state, payload_obj) {
    state.email = payload_obj.email;
    state.name = payload_obj.name;
    state.points = payload_obj.points;
    state.pic_url = payload_obj.pic_url;
  },
  UPDATE_POINTS(state, payload_pts) {
    state.points = payload_pts;
  },
  DELETE(state) {
    state = defaultState();
  }
}

const actions = {
  set_data(context, user_obj) {
    context.commit("INIT", user_obj);
  },
  update_pt(context, number) {
    console.log(`Updating points to ${number}`);
    context.commit("UPDATE_POINTS", number);
  },
  clear_data(context) {
    context.commit("DELETE");
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