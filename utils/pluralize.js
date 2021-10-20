export default (number, singularWord) => {
  const text = `${number} ${singularWord}`
  if (number) {
    return text
  }
  return text + 's'
}