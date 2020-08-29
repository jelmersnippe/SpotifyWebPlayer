import React from "react";
import "./LibraryView.scss";
import { NavItem } from "../../components";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../DataLayer";
import { Route, Switch } from "react-router-dom";

function LibraryView() {
  const [{ playlists }] = useDataLayerValue();

  return (
    <div className="library view">
      <h2 className="title">Library</h2>
      <div className="nav">
        <NavItem text="Playlists" path="/library/playlists" key="playlists" />
        <NavItem text="Artists" path="/library/artists" key="artists" />
        <NavItem text="Albums" path="/library/albums" key="albums" />
      </div>
      <Switch>
        <div className="content">
          <Route path="/library/playlists">
            <div className="playlists">
              {playlists?.items?.map((playlist) => (
                <Link
                  className="playlist-item"
                  to={`/playlist/${playlist.id}`}
                  key={playlist.id}
                >
                  <img
                    className="art"
                    src={
                      playlist?.images?.reduce((initial, image) => {
                        if (!initial.url || image.height < initial.height) {
                          initial = image;
                        }
                        return initial;
                      }, {}).url
                    }
                    alt={playlist.name}
                  ></img>
                  <div className="info">
                    <div className="name">{playlist.name}</div>
                    <div className="creator">{playlist.owner.display_name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Route>
          <Route path="/library/artists">
            <h4>Artists</h4>
          </Route>
          <Route path="/library/albums">
            <h4>Albums</h4>
          </Route>
        </div>
      </Switch>
    </div>
  );
}

export default LibraryView;
