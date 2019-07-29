import * as React from "react";
import RenderLayer from "@skbkontur/react-ui/components/RenderLayer";
import Popup from "@skbkontur/react-ui/components/Popup";

const styles = require("./Tooltip.less");

export interface PinOptions {
  hasPin?: boolean;
  pinSize?: number;
  pinOffset?: number;
}

export type TooltipPartElement = React.ReactElement<any> | React.ReactText;

export interface TooltipProps {
  targetGetter: () => Element;
  positions?: string[];
  offset?: number;
  onClose?: () => void;
  onSkip?: () => void;
  pinOptions?: PinOptions;
  width?: number;
  crossColor?: string;
}

export class Tooltip extends React.Component<TooltipProps> {
  static defaultProps = {
    positions: ["bottom middle"],
    width: 500,
    pinOptions: {
      hasPin: true,
      pinSize: 16,
      pinOffset: 32
    },
    onClose: () => {}
  };
  static Container = Container;
  static Header = Header;
  static Body = Content;
  static Footer = Footer;
  state = { hasElem: true };

  componentWillMount() {
    if (!this.props.targetGetter()) {
      this.setState({ hasElem: false });
    }
  }

  render() {
    if (!this.state.hasElem) return <span />;
    return (
      <RenderLayer
        onClickOutside={this.props.onClose}
        onFocusOutside={() => {}}
        active
      >
        <Popup
          anchorElement={this.props.targetGetter()}
          positions={this.props.positions}
          margin={this.props.offset}
          {...this.props.pinOptions}
          opened
          hasShadow
        >
          <div className={styles.tooltip} style={{ width: this.props.width }}>
            <span
              className={styles.closeBtn}
              style={{ color: this.props.crossColor }}
              onClick={this.props.onClose}
            >
              ×
            </span>
            {this.props.children}
          </div>
        </Popup>
      </RenderLayer>
    );
  }
  componentDidMount() {
    if (!this.state.hasElem) {
      this.props.onSkip();
    }
  }
}

export interface TooltipPartProps {
  children?: React.ReactNode;
}

export function Container({ children }: TooltipPartProps) {
  return <div className={styles.container}>{children}</div>;
}

export function Header({ children }: TooltipPartProps) {
  return <div className={styles.header}>{children}</div>;
}

export function Content({ children }: TooltipPartProps) {
  return <div className={styles.body}>{children}</div>;
}

function Footer({ children }: TooltipPartProps) {
  return <div className={styles.footer}>{children}</div>;
}
