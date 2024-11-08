import React, { Component } from "react";
import { fabric } from "fabric";
import { connect } from "react-redux";
import { setCanvasBackgroundImage, setCanvas } from "../../Actions/editor";

class BackgroundImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: "",
    };
  }

  removeBackground = () => {
    const { canvas } = this.props.editorState;
    this.props.setCanvasBackgroundImage({ backgroundImage: "" });
    if (canvas.backgroundImage) {
      canvas.setBackgroundImage(null);
      canvas.renderAll();
    }
    this.props.setCanvas({ canvas });

    console.log(canvas.getObjects());
  };

  addBackground = (url) => {
    const { canvas } = this.props.editorState;
    this.removeBackground();

    fabric.Image.fromURL(
      url,
      (img) => {
        if (canvas) {
          canvas.setBackgroundImage(
            img,
            () => {
              canvas.renderAll();
            },
            {
              scaleX: canvas.width / img.width,
              scaleY: canvas.height / img.height,
            }
          );
        }
      }
      // { crossOrigin: "anonymous" }
    );
    this.props.setCanvasBackgroundImage({ backgroundImage: url });
    this.props.setCanvas({ canvas });
  };

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.addBackground(
              "https://original-bucket-name-080899.s3.ap-southeast-1.amazonaws.com/Screenshot%202024-11-01%20at%2016.04.52.pdf?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaDmFwLXNvdXRoZWFzdC0xIkYwRAIgF%2FoSHY5LikTI4Xp0oF0kMACVF%2B9EBYjmhLPCoawwdjYCIHdBiQo52yECUDyB73DNGqYvZQC9XCM8rfGzHd24X%2BouKtQDCKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjUxNDEwNTU3MDc3IgyzGjUtqVQYcWK3VrEqqAOKdUzJM83aThSlZYYqZlefT%2FH83Gbe0Y2xwQXHQ5COgUM1SLv6CxxehvQGP3cJQwsG%2BlYtg6zF7QmT1HfU%2BaQuf71XPA2%2BFZCIq3b%2B4VCUfKf9BzX%2BxspuIjkKaI4M%2BtwcPC6AJ%2Bxs8dB%2BYCysA5EwH88uQTjK6iT21b9eBwvHaAUMcaVHzz%2B4c2YFvRIf8%2Bo%2BkxC97FnMkwAB8fjAV%2ByDPpF7rWibm36pQ0gWP2C0UTfiQ%2Fx3mcf1bSP8x7rxahc2dPhP1gAsrC%2FecrHlR%2Bv1JzHIrkek5MD0Bxh480z9pgBHrfQxJT4ybHuvVzq5LEhGncxzpVFbt%2Bm0hP7BPCUKQ7LcQw2ClwM%2FAaFgGTrFn32wITsVsEFY4%2FXtetAu37S6eV1n3jrVj2bWaeApQkkfA3LfL3rdnr0QEPwH4nOTH6GQrNLiPdWbJ77zQnnpCTPa77TSh9UvB0mnkwWswSdVNwbTevFLx0XllCAA%2BuLINxd77Ss%2FfZcHk4aQnsqJb0td5aTY4cBv8v924Ka803esnjEwLsemYt%2BPUT5hLOt0HH26ReoquvHdMN23krkGOuUCuxT5y5fnFEt7cYif7rcgr%2Bah8BNsHbSnTpu09ckU7U70rTZAbFESh1Bc%2BbKLj24ISVAX%2BZFSeZOJLAoTkpvz2ddd8ZdtTfNXG7U3jQcSQ3ZfuQnTW8%2BuBhyK1VQivwMw%2BKVmmCSiTse0SpQR1CXy6IdJwFzQvj5JaZVITW29qwu5DNp5remzOSBVDDTwUaoYwDjQ5z2bDAExNlxosexP3RSKoeRUVor4PMeL8jtrHuzjKCyuOXTxyJ5hRGa0%2BiXW2pPlehuF3YC2UAqOHPZY60Ny%2FeWvxHzJ9%2BEObU8J0d6YT8UjZMMbRCM7kZM2ot54klBjxhLPVcmuYq8k9I3iBhwvLnl%2FYhGKV1kZa%2BGS2pz7IeoQbynrUwNvHvL2pO40riyfA73PaE%2BWijg6J7uDOXQwKB5wiql%2FUIIArCyVB4fBTtRtUxWzi16LErv4o66rocGG1GC3ayzyfX%2BoFTB1WsO1pW39&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAZPKYYJCK5D2MFLY7%2F20241101%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20241101T094418Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0f2de96c52d8a05a1f19c1397e8de851418c830b69479dfc35fb4873a3d4a44c"
            )
          }
        >
          Add Background Image{" "}
        </button>{" "}
        <button onClick={this.removeBackground}>Remove Background </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editorState: state.editor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCanvasBackgroundImage: (data) => {
      return dispatch(setCanvasBackgroundImage(data));
    },
    setCanvas: (data) => {
      return dispatch(setCanvas(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundImage);
