class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal){
      return true;
    } else {
      return false;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    if (name == this.name) {
      return this;
    }

    for (const child of this.offspring) {
      let match = child.vampireWithName(name);
      if (match) {
        return match;
      }
    }
    return null;
    }  

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalNumVamp = 0;

    for (const child of this.offspring) {
      totalNumVamp += child.totalDescendents +1;
    }
    return totalNumVamp;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let arrayVamp = [];

    if (this.yearConverted > 1980) {
      arrayVamp.push(this);
    }

    for (let child of this.offspring) {
      arrayVamp = arrayVamp.concat(child.allMillennialVampires);
    }
    return arrayVamp;
  }
  
  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  // TODO: This is not working!!
  closestCommonAncestor(vampire) {
    if (this.isMoreSeniorThan(vampire)) {
      return this;
    } else {
      return vampire;
    }
  }
}

module.exports = Vampire;

