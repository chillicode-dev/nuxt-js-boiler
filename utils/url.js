const protocolRegExp = /^(?:[a-z]+:)?\/\//i;

/**
 * Tests if passed string is an absolute URL
 * @param url {string}
 * @return {boolean}
 */
export const isAbsolute = url => protocolRegExp.test(url);

/**
 * Changes URL protocol
 * @param url {string}
 * @param protocol {string}
 * @return {string}
 */
export const changeProtocol = (url, protocol = 'http') => {
  if (isAbsolute(url)) {
    return url.replace(protocolRegExp, `${protocol}://`);
  }

  return `${protocol}://${url[0] === '/' ? url.slice(1) : url}`;
};

/**
 * Concatenate absolute and relative link to one string
 * @param baseLink {string}
 * @param relativeLink {string}
 * @return {string} - concatenated links
 */
export const concatLinks = (baseLink, relativeLink) => {
  if (typeof baseLink !== 'string' || typeof relativeLink !== 'string') {
    return '';
  }

  const baseLinkHasSlash = baseLink.slice(-1) === '/';
  const relativeLinkHasSlash = relativeLink[0] === '/';
  const concatedBaseLink = baseLink.slice(0, baseLink.length - 1);
  const concatedRelativeLink = relativeLink.slice(1);

  if (baseLinkHasSlash && relativeLinkHasSlash) {
    return `${concatedBaseLink}/${concatedRelativeLink}`;
  }

  if (baseLinkHasSlash && !relativeLinkHasSlash) {
    return `${concatedBaseLink}/${relativeLink}`;
  }

  if (!baseLinkHasSlash && relativeLinkHasSlash) {
    return `${baseLink}/${concatedRelativeLink}`;
  }

  return `${baseLink}/${relativeLink}`;
};
