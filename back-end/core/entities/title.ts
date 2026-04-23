import stringSimilarity from "string-similarity-js";

export class Title {
  private value: string;

  toValue() {
    return this.value;
  }

  toTitleCase() {
    return this.value
      .toLowerCase()
      .trim()
      .split(/\s+/) // Divide por qualquer quantidade de espaços brancos
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace(/\(/g, "")
      .replace(/\)/g, "");
  }

  similarity(other: Title): boolean {
    const similarity = stringSimilarity(this.toValue(), other.toValue());

    if (similarity >= 0.9) {
      return true;
    } else {
      return false;
    }

  }

  static normalizeTitle(title: string): string {
    if (!title || typeof title !== 'string') {
      return '';
    }
    return (
      title
        .toLowerCase()
        // .normalize('NFD')
        // .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/\(.*?\)/g, "") // Remove text within parentheses
        // .replace(/[^a-z0-9\s]/g, "") // Remove special characters
        // .replace(/[^a-z0-9\s/]/g, "") // Remove special characters except '/'
        // .replace(/[^a-z0-9\s/ç]/g, "") // Remove special characters except '/' and 'ç'
        .replace(/[^\p{L}0-9\s]/gu, "") // Remove special characters except letters and numbers
        .replace(/\s+/g, " ") // Replace multiple spaces with a single space
        .replace(/nova/g, "") // Remove the word 'NOVA'
        .replace(/^y\s+/, "") // Remove 'y ' from the beginning if present
        .trim()
    ); // Trim leading and trailing spaces
  }

  private constructor(parameter: string) {
    this.value = parameter;
  }

  static create(parameter: string): Title {
    return new Title(parameter);
  }

  static createNormalized(parameter: string): Title {
    return new Title(this.normalizeTitle(parameter));
  }

}
