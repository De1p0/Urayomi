import { corFetch } from "../../api/corFetch";
import { SourceResponse } from "../../types/Api";



interface HttpResponse {
    status: number;
    headers: Record<string, string>;
    body: string;
}


interface HttpResponse {
    status: number;
    headers: Record<string, string>;
    body: string;
}

class Client {
    defaultHeaders: Record<string, string>;

    constructor(defaultHeaders: Record<string, string> = {}) {
        this.defaultHeaders = defaultHeaders;
    }

    getHeaders(): Record<string, string> {
        return {};
    }

    async get(url: string): Promise<HttpResponse> {
        const res = await corFetch(url);

        return {
            status: res.status,
            headers: Object.fromEntries(res.headers.entries()),
            body: await res.text(),
        };
    }

    async post(
        url: string,
        data: unknown,
        headers: Record<string, string> = {}
    ): Promise<HttpResponse> {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                ...headers,
            },
            body: typeof data === "string" ? data : JSON.stringify(data),
        });

        return {
            status: res.status,
            headers: Object.fromEntries(res.headers.entries()),
            body: await res.text(),
        };
    }
}




// https://raw.githubusercontent.com/De1p0/Urayomi-Extensions/Urayomi-Extensions/index.json
export async function getSourceList(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch script: ${response.status}`);

    const json = await response.json();
    return json
}

export async function loadSource(source: SourceResponse) {
    window.corFetch = corFetch;
    const response = await fetch(source.sourceCodeUrl);
    const code = await response.text();
    const wrapped = `                  
        return (function() {
            let __result;                                 

            class SharedPreferences {
                get(key) {
                    return sendMessage("get", JSON.stringify([key]));
                }
                getString(key, defaultValue) {
                    return sendMessage("getString", JSON.stringify([key, defaultValue]));
                }
                setString(key, value) {
                    return sendMessage("setString", JSON.stringify([key, value]));
                }
            };

    
            class Client {
                constructor(defaultHeaders = {}) {
                  this.defaultHeaders = defaultHeaders;
                }

                getHeaders(extraHeaders = {}) {
                  return {
                    ...this.defaultHeaders,              
                    ...extraHeaders,
                  };
                }
    
                async get(url, headers = {}) {
                  const res = await window.corFetch(url, {
                    method: "GET",
                    headers: headers
                  });

                  const body = await res.text();

                  return {
                    status: res.status,
                    headers: Object.fromEntries(res.headers.entries()),
                    body
                  };
                }
              } 


            class MElement {
                constructor(el) {
                    this.el = el;
                }

                get text() {
                    return this.el?.textContent?.trim() ?? null;
                }

                attr(name) {
                    return this.el?.getAttribute(name) ?? null;
                }

                select(selector) {
                    if (!this.el) return [];
                    return Array.from(this.el.querySelectorAll(selector)).map(
                        (e) => new MElement(e)
                    );
                }

                selectFirst(selector) {
                    const el = this.el?.querySelector(selector);
                    return el ? new MElement(el) : null;
                }

                get raw() {
                    return this.el;
                }
            };
            class Document {
                constructor(html) {
                    const parser = new DOMParser();
                    this._doc = parser.parseFromString(html, "text/html");
                }

                get body() {
                    return new MElement(this._doc.body);
                }

                get documentElement() {
                    return new MElement(this._doc.documentElement);
                }

                get head() {
                    return new MElement(this._doc.head);
                }

                get parent() {
                    return this._doc.documentElement?.parentElement
                        ? new MElement(this._doc.documentElement.parentElement)
                        : null;
                }

                get outerHtml() {
                    return this._doc.documentElement?.outerHTML ?? null;
                }

                get text() {
                    return this._doc.body?.textContent?.trim() ?? null;
                }

                children() {
                    return Array.from(this._doc.children).map(
                        (el) => new MElement(el)
                    );
                }

                select(selector) {
                    return Array.from(this._doc.querySelectorAll(selector)).map(
                        (el) => new MElement(el)
                    );
                }

                selectFirst(selector) {
                    const el = this._doc.querySelector(selector);
                    return el ? new MElement(el) : null;
                }

                xpathFirst(xpath) {
                    const result = this._doc.evaluate(
                        xpath,
                        this._doc,
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE,
                        null
                    );
                    return result.singleNodeValue
                        ? new MElement(result.singleNodeValue)
                        : null;
                }

                xpath(xpath) {
                    const result = this._doc.evaluate(
                        xpath,
                        this._doc,
                        null,
                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                        null
                    );

                    const out = [];
                    for (let i = 0; i < result.snapshotLength; i++) {
                        const node = result.snapshotItem(i);
                        if (node) out.push(new MElement(node));
                    }
                    return out;
                }

                getElementsByClassName(name) {
                    return Array.from(this._doc.getElementsByClassName(name)).map(
                        (el) => new MElement(el)
                    );
                }

                getElementsByTagName(name) {
                    return Array.from(this._doc.getElementsByTagName(name)).map(
                        (el) => new MElement(el)
                    );
                }

                getElementById(id) {
                    const el = this._doc.getElementById(id);
                    return el ? new MElement(el) : null;
                }

                attr(name) {
                    return this._doc.documentElement?.getAttribute(name)?.trim() ?? null;
                }

                hasAttr(name) {
                    return this._doc.documentElement?.hasAttribute(name) ?? false;
                }
            };


            const _storage = {};
            function sendMessage(action, payload) {
                // FIX: Handle undefined/null payload
                if (payload === undefined || payload === null) {
                    payload = "[]";
                }
                
                let args;
                try {
                    args = JSON.parse(payload);
                } catch (e) {
                    console.error("sendMessage: Failed to parse payload:", payload);
                    return null;
                }
                
                switch (action) {
                    case "get":
                        return _storage[args[0]] ?? null;
                    case "getString":
                        return _storage[args[0]] ?? args[1] ?? "";
                    case "setString":
                        _storage[args[0]] = args[1];
                        return true;
                    default:
                        console.warn(\`sendMessage: Unknown action "\${action}"\`);
                        return null;
                }
            }
            class MProvider {
                constructor() {
                    this.source = ${JSON.stringify(source)};
                }
            }


            __result = (function() {


                ${code}

                return DefaultExtension
            })();

            return __result;    
        })();
    `;


    const ext = new Function(
        wrapped
    )();

    // const instance = new ext();
    // try {
    //     console.log(instance);
    //     const results = await instance.search("adachi", 1, instance.getFilterList());
    //     console.log(results, "resultsss");
    // } catch (e) {
    //     console.error("Search failed:", e);
    // }

    return ext;
}



/*
  const ExtensionClass = await loadSource(
          "https://raw.githubusercontent.com/De1p0/Urayomi-Extensions/refs/heads/main/sources/mangadex.js"
        );

        const source = new ExtensionClass();

        console.log(source.source, " AA");
      } catch (err) {
        console.error("Failed to load extension:", err);
      }
*/