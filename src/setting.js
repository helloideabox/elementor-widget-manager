import './setting.scss';

const { __ } = wp.i18n;

const {
	Panel,
	PanelRow,
	Placeholder,
	Spinner,
} = wp.components;

const {
	Component,
	Fragment,
} = wp.element;


class Settings extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			isAPILoaded: false,
			isAPISaving: false,
			select_option: '-1',
			el_widget_list: [],
		}

		this.el_widgets = [];
		this.selected_widget = [];

		this.changeStatus = this.changeStatus.bind( this );
		this.changeOptions = this.changeOptions.bind( this );
		this.selectCheckbox = this.selectCheckbox.bind( this );
		this.selectApply = this.selectApply.bind( this );
	}



	// Formatting to all the previous setting when the component is mounted.
	async componentDidMount() {

		// Making array of object.
		let { el_widget_list } = this.state
		Object.keys( ewm_widgets ).map( ( value,index ) => {
			el_widget_list[index] = {
				title: ewm_widgets[value],
				slug: value,
				status: true,
			};
		} );

		this.setState( { el_widget_list } );


		// Getting data from setting model api.
		wp.api.loadPromise.then( () => {
			this.widget = new wp.api.models.Settings();

			if( ! this.state.isAPILoaded ) {
				this.widget.fetch().then( response => {
					console.log( response );

					let { el_widget_list } = this.state;

					Object.keys( this.state.el_widget_list ).map( ( index ) => {
						if ( response.ewm_widget.some( (val) => val === this.state.el_widget_list[index].slug ) ) {
							el_widget_list[index].status = ! this.state.el_widget_list[index].status
							this.el_widgets.push( this.state.el_widget_list[index].slug );
						}
					})
					this.setState( { el_widget_list } );
					this.setState( { isAPILoaded: true } );
				} )
			}
		} )
	}



	// Selected elements pushed into new array.
	selectCheckbox( e, index ) {
		
		// Select those which are checked.
		if( e.target.checked ) {
			this.selected_widget.push( this.state.el_widget_list[index].slug );
		} else {
			let itemIndex = this.selected_widget.indexOf( this.state.el_widget_list[index].slug );
			this.selected_widget.splice( itemIndex, 1 );
		}
		console.log( this.selected_widget );
	}



	// Selecting particular option from select.
	selectChange( e ) {
		this.setState( { select_option: e.target.value } );
	}




	// For saving the setting in the setting api.
	changeOptions( option, value ) {

		this.setState( { isAPISaving: true } );

		const model = new wp.api.models.Settings( {
			[option]: value
		} );

		model.save().then( ( response ) => {
			console.log( response );

			if ( 'success' == status ) {
				this.setState( { isAPISaving: false } );
			}
		} )
	}



	selectApply() {

		let { el_widget_list } = this.state;

		if( 'activate' == this.state.select_option ) {
			Object.keys( this.state.el_widget_list ).map( ( index ) => {
				if ( this.selected_widget.some( (val) => val === this.state.el_widget_list[index].slug ) && ! this.state.el_widget_list[index].status ) {
					el_widget_list[index].status = ! el_widget_list[index].status;

					let itemIndex = this.el_widgets.indexOf( this.state.el_widget_list[index].slug );
					this.el_widgets.splice( itemIndex, 1 );
				}
			})
		} else {
			console.log( 'sad' );
		}

		this.setState( { el_widget_list } );
	}



	// For changing the status from activate to deactivate and vice versa.
	changeStatus( index ) {

		let { el_widget_list } = this.state;
		el_widget_list[index].status = ! this.state.el_widget_list[index].status
		
		this.setState( { el_widget_list } );

		// If the status is false then push otherwise pop.
		if( ! this.state.el_widget_list[index].status ) {
			this.el_widgets.push( this.state.el_widget_list[index].slug ); 
		} else {
			let itemIndex = this.el_widgets.indexOf( this.state.el_widget_list[index].slug );
			this.el_widgets.splice( itemIndex, 1 );
		}

		this.changeOptions( 'ewm_widget', this.el_widgets);
	}




	render() {
		if( ! this.state.isAPILoaded ) {
			return (
				<Placeholder>
					<Spinner />
				</Placeholder>
			)
		}

		return(
			<Fragment>
				<header class="ewm-setting-header">
					<div class="ewm-setting-title">
						<h1>{ __( 'Elementor Widget Manager' ) }</h1>
					</div>
				</header>

				<Panel className="ewm-setting-container">
					<div className="ewm-select-options-container">
						<div className="ewm-select-options-container-checkbox">
							<input type='checkbox' className="ewm-select-options-checkbox" />
						</div>

						<div className="ewm-select-options-container-select">
							<select value={ this.state.select_option } onChange={ ( e ) => this.selectChange( e ) }>
								<option value="-1">{ __( 'Bulk Actions' ) }</option>
								<option value="activate">{ __( 'Activate' ) }</option>
								<option value="deactive">{ __( 'Deactivate' ) }</option>
							</select>	
						</div>

						<div className="ewm-select-options-container-button">
							<button className="button" onClick={ this.selectApply }>{ __( 'Apply' ) }</button>
						</div>
					</div>

					<PanelRow>
						<ul className="ewm-setting-list">
							{
								Object.keys( this.state.el_widget_list ).map( ( index ) => {
									return (
										<li className={ "ewm-setting-list-item " + (this.state.el_widget_list[index].status? 'deactivate':'activate' ) }>
											<div className="ewm-setting-list-item-container-checkbox">
												<input type='checkbox' className="ewm-setting-list-item-checkbox" onClick={ ( e ) => this.selectCheckbox( e, index ) } />
											</div>

											<div className="ewm-setting-list-item-container-title">
												<h4>{ __( this.state.el_widget_list[index].title ) }</h4>
											</div>

											<div className="ewm-setting-list-item-container-button">
												<button id={ 'item-' + index } onClick={ () => this.changeStatus( index ) } className="ewm-setting-list-button">
													{ this.state.el_widget_list[index].status? __( 'Deactivate' ):__( 'Activate' ) }
												</button>
											</div>
										</li>
									)
								})
							}
						</ul>
					</PanelRow>
				</Panel>
			</Fragment>
		)
	}
}

export default Settings;