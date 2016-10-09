class PromiseCanceler {
  constructor() {
    this.set = new Set();
  }

  /**
   * Add Promise Instance
   *
   * @param {Promise} p
   * @return {Promise}
   */
  add(p) {
    this.set.add(p);
    return p.then((...args) => {
      this.set.delete(p);
      return Promise.resolve(...args);
    })
    .catch((err) => {
      this.set.delete(p);
      return Promise.reject(err);
    });
  }

  /**
   * Cancel all promises
   */
  cancelAll() {
    for (const p of this.set.values()) {
      p.cancel();
    }
    this.set.clear();
  }
}

export default PromiseCanceler;
