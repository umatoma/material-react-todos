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
    const wrappedPromise = p.then((...args) => {
      this.set.delete(p);
      return Promise.resolve(...args);
    })
    .catch((err) => {
      this.set.delete(p);
      return Promise.reject(err);
    });
    this.set.add(wrappedPromise);
    return wrappedPromise;
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
