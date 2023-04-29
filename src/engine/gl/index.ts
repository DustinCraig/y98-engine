import {MAIN_CANVAS_NAME} from '../constants';

class GLInstance {
  private static _instance: GLInstance;

  private static init(): WebGL2RenderingContext {
    const canvas = <HTMLCanvasElement | null>(
      document.getElementById(MAIN_CANVAS_NAME)
    );

    if (canvas) {
      const context = canvas.getContext('webgl2');
      if (!context) {
        // TODO: Logging
        return {} as WebGL2RenderingContext;
      } else {
        GLInstance.gl = context as WebGL2RenderingContext;
        GLInstance.gl.getExtension('OES_standard_derivatives');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // TODO: this along with other
        // initializations should go into a timed loading function
        setTimeout(() => {
          GLInstance.resize(canvas.width, canvas.height);
        }, 200);

        GLInstance.vaoExtension = GLInstance.gl.getExtension(
          'OES_vertex_array_object'
        );

        GLInstance.gl.enable(GLInstance.gl.DEPTH_TEST);
        GLInstance.gl.depthFunc(GLInstance.gl.LEQUAL);

        return GLInstance.gl;
      }
    }
    return {} as WebGL2RenderingContext;
  }

  public static gl: WebGL2RenderingContext = GLInstance.init();
  public static vaoExtension: OES_vertex_array_object | null;
  public static width: number;
  public static height: number;

  public static get Instance() {
    return this._instance;
  }

  public static clear() {
    gl?.clearColor(0, 0, 0, 1);
    gl?.clearDepth(1.0);
    gl?.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  public static resize(width: number, height: number) {
    console.log('wh ', width, height);
    gl?.viewport(0, 0, width, height);
    GLInstance.width = width;
    GLInstance.height = height;
  }
}

export const glInstanceWrapper = GLInstance;
export const gl = GLInstance.gl;
export const vaoExtension = GLInstance.vaoExtension;
