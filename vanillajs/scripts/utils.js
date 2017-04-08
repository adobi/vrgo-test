class $
{
  static find(selector, context)
  {
    if (!context) {
      context = document;
    }
    return context.querySelector(selector);
  }

  static hasClass(element, className)
  {
    return element.classList.contains(className);
  }

  static toggleClass(element, className)
  {
    return element.classList.toggle(className);
  }
}

export default $
