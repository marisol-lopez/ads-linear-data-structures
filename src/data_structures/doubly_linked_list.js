class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const newNode = new this.Node({element});
    newNode.next = this._head();
    newNode.prev = this._sentinel;
    this._head().prev = newNode;
    this._sentinel.next = newNode;

    return newNode;
  }

  insertTail(element) {
    const newNode = new this.Node({element});
    newNode.next = this._sentinel;
    newNode.prev = this._tail()
    this._tail().next = newNode;
    this._sentinel.prev = newNode;

    return newNode;
  }

  removeHead() {
    return this._head().remove();
  }

  removeTail() {
    return this._tail().remove();
  }

  remove(node) {
    if (node.remove) {
      return node.remove();
    }
  }

  forEach(callback, self = this) {
    // initalize variable for keeping track of iterations;
    var i = 0;
    // create variable to store current head
    var node = this._head();
    // conditional check for node not being sentinel
    while (node != this._sentinel) {
      // call 'callback' function with element data, iterator, and current instance
      callback(node.element, i, self);
      // increment iterator by 1
      i++
      // set node to the next node
      node = node.next;
    }
  }


  count() {
    // initialize and set counter to 0
    var counter = 0;
    // call 'this.forEach()' function with anonymous function that increments counter by 1
    this.forEach(() => counter += 1);
    return counter;
  }
}

export default DoublyLinkedList;