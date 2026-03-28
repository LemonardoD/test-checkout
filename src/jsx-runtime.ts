/**
 * Custom JSX runtime — converts TSX to HTML strings.
 * No virtual DOM, no hydration, no client JS. Pure SSR.
 */

// ---------------------------------------------------------------------------
// SafeHTML — marks a string as already-escaped HTML so it won't be
// double-escaped when used as a child of another element.
// ---------------------------------------------------------------------------

class SafeHTML {
  readonly value: string;
  constructor(value: string) {
    this.value = value;
  }
  toString(): string {
    return this.value;
  }
}

/** Void elements that must not have a closing tag */
const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img",
  "input", "link", "meta", "param", "source", "track", "wbr",
]);

/** Map JSX prop names to their HTML attribute equivalents */
function attrName(key: string): string {
  switch (key) {
    case "className":
      return "class";
    case "htmlFor":
      return "for";
    default:
      return key;
  }
}

/** Escape HTML-sensitive characters in text content */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Escape attribute values */
function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/**
 * JSX Factory function.
 *
 * Called by the transpiler for every <Tag ...>...</Tag> expression.
 * - If `tag` is a string, render an HTML element.
 * - If `tag` is a function (component), call it with props.
 *
 * Returns a SafeHTML instance so parent elements don't re-escape it.
 */
export function h(
  tag: string | ((props: Record<string, unknown>) => SafeHTML),
  props: Record<string, unknown> | null,
  ...children: unknown[]
): SafeHTML {
  // --- Function component ---
  if (typeof tag === "function") {
    // Wrap rendered children as SafeHTML so they won't be re-escaped
    // when the component injects {children} into its own JSX.
    const rendered = renderChildren(children);
    return tag({ ...(props ?? {}), children: new SafeHTML(rendered) });
  }

  // --- HTML element ---
  let html = `<${tag}`;

  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (key === "children" || key === "dangerouslySetInnerHTML") continue;
      if (value === false || value == null) continue;
      if (value === true) {
        html += ` ${attrName(key)}`;
      } else {
        html += ` ${attrName(key)}="${escapeAttr(String(value))}"`;
      }
    }
  }

  // Void element — self-closing, no children
  if (VOID_ELEMENTS.has(tag)) {
    html += " />";
    return new SafeHTML(html);
  }

  html += ">";

  // dangerouslySetInnerHTML support
  if (props?.dangerouslySetInnerHTML) {
    const inner = props.dangerouslySetInnerHTML as { __html: string };
    html += inner.__html;
  } else {
    html += renderChildren(children);
  }

  html += `</${tag}>`;
  return new SafeHTML(html);
}

function renderChildren(children: unknown[]): string {
  let out = "";
  for (const child of children) {
    if (child == null || child === false || child === true) continue;
    if (child instanceof SafeHTML) {
      // Already-rendered HTML — pass through raw
      out += child.value;
    } else if (Array.isArray(child)) {
      out += renderChildren(child);
    } else if (typeof child === "string") {
      // Plain text — escape it
      out += escapeHtml(child);
    } else {
      out += escapeHtml(String(child));
    }
  }
  return out;
}

/** Fragment — simply renders its children with no wrapper element */
export function Fragment(props: { children?: string }): SafeHTML {
  return new SafeHTML(props.children ?? "");
}
