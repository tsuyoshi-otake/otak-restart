# Change Log

## [1.0.4] - 2025-02-20

### Changed
- Changed operation method from dialog to tooltip-based interface
- Added clickable links in status bar tooltip for quick actions
- Improved UX by reducing the number of clicks needed for operations

## [1.0.3] - 2025-02-18

### Changed
- Fixed terminology in documentation from "single-click" to "two-click"
- Updated user interface descriptions for accuracy

## [1.0.2] - 2025-02-18

### Changed
- Performance improvements for Extension Host restart process
- Optimized internal state management
- Enhanced error handling and recovery

## [1.0.1] - 2025-02-18

### Changed
- Simplified Extension Host restart implementation
- Removed unnecessary notifications and timeout handling
- Improved stability by reducing complexity

## [1.0.0] - 2025-02-17

### Added
- One-click restart functionality for:
  - Extension Host restart
  - VSCode window reload
- Status bar button with customizable position and text
- Clear confirmation dialogs
- Command palette integration
- Error handling with detailed messages

### Features
- Simple and intuitive restart operations
- Customizable button location (left/right)
- Support for VSCode icons in button text
- Non-intrusive confirmation dialogs

### Notes
- Requires VSCode 1.9.0 or higher
- Settings are applied immediately
- No restart required for configuration changes

## [0.0.1] - 2025-02-17

### Added
- Initial release of Otak Restart Extension for VSCode
- Basic Extension Host restart functionality
- Status bar integration
- Simple configuration options